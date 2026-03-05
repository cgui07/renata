function getImportGroup(node) {
  const hasNamedSpecifier = node.specifiers.some((specifier) => specifier.type === "ImportSpecifier")
  return hasNamedSpecifier ? 1 : 0
}

function compareByGroupAndLength(a, b) {
  if (a.group !== b.group) return a.group - b.group
  if (a.statementLength !== b.statementLength) return a.statementLength - b.statementLength
  return a.originalIndex - b.originalIndex
}

function getAttachedCommentStartLine(node, sourceCode) {
  const commentsBefore = sourceCode.getCommentsBefore(node)
  if (commentsBefore.length === 0) return node.loc.start.line

  const byEndLine = new Map()
  for (const comment of commentsBefore) {
    byEndLine.set(comment.loc.end.line, comment)
  }

  let cursorLine = node.loc.start.line - 1
  let firstComment = null

  while (byEndLine.has(cursorLine)) {
    const comment = byEndLine.get(cursorLine)
    firstComment = comment
    cursorLine = comment.loc.start.line - 1
  }

  return firstComment ? firstComment.loc.start.line : node.loc.start.line
}

function getBlockRange(node, sourceCode) {
  const text = sourceCode.text
  const startLine = getAttachedCommentStartLine(node, sourceCode)
  const startIndex = sourceCode.getIndexFromLoc({ line: startLine, column: 0 })

  const endLine = node.loc.end.line
  const nextLineStart =
    endLine < sourceCode.lines.length
      ? sourceCode.getIndexFromLoc({ line: endLine + 1, column: 0 })
      : text.length

  return { startIndex, endIndex: nextLineStart }
}

function normalizeBlockText(blockText) {
  return blockText.replace(/[\r\n]+$/u, "")
}

function hasDifferentOrder(entries) {
  const sorted = [...entries].sort(compareByGroupAndLength)
  if (sorted.length !== entries.length) return true
  for (let i = 0; i < entries.length; i += 1) {
    if (sorted[i].node !== entries[i].node) return true
  }
  return false
}

function detectEol(text) {
  return text.includes("\r\n") ? "\r\n" : "\n"
}

function getImportSequences(programBody) {
  const sequences = []
  let current = []

  for (const node of programBody) {
    if (node.type === "ImportDeclaration") {
      current.push(node)
      continue
    }

    if (current.length > 0) {
      sequences.push(current)
      current = []
    }
  }

  if (current.length > 0) sequences.push(current)
  return sequences
}

const rule = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Ordena imports por tipo (sem chaves e com chaves) e por tamanho do statement.",
      recommended: false,
    },
    fixable: "code",
    schema: [],
    messages: {
      reorder:
        "Imports fora da ordem: primeiro sem chaves, depois com chaves, ambos por tamanho crescente.",
    },
  },
  create(context) {
    const sourceCode = context.sourceCode

    function reportSequence(sequence) {
      const entries = sequence.map((node, originalIndex) => {
        const statementText = sourceCode.getText(node)
        const group = getImportGroup(node)
        const statementLength = statementText.length
        const blockRange = getBlockRange(node, sourceCode)
        const blockText = sourceCode.text.slice(blockRange.startIndex, blockRange.endIndex)

        return {
          node,
          originalIndex,
          group,
          statementLength,
          blockRange,
          blockText: normalizeBlockText(blockText),
        }
      })

      if (!hasDifferentOrder(entries)) return

      const sorted = [...entries].sort(compareByGroupAndLength)
      const withoutBraces = sorted.filter((entry) => entry.group === 0).map((entry) => entry.blockText)
      const withBraces = sorted.filter((entry) => entry.group === 1).map((entry) => entry.blockText)

      const eol = detectEol(sourceCode.text)
      const sections = []
      if (withoutBraces.length > 0) sections.push(withoutBraces.join(eol))
      if (withBraces.length > 0) sections.push(withBraces.join(eol))

      const replacement = sections.join(eol)
      const replaceStart = entries[0].blockRange.startIndex
      const replaceEnd = entries[entries.length - 1].blockRange.endIndex
      const originalRegion = sourceCode.text.slice(replaceStart, replaceEnd)
      const needsTrailingEol = /\r?\n$/u.test(originalRegion)
      const finalText = needsTrailingEol ? `${replacement}${eol}` : replacement

      context.report({
        node: sequence[0],
        messageId: "reorder",
        fix(fixer) {
          return fixer.replaceTextRange([replaceStart, replaceEnd], finalText)
        },
      })
    }

    return {
      Program(node) {
        const sequences = getImportSequences(node.body)
        for (const sequence of sequences) {
          if (sequence.length > 1) reportSequence(sequence)
        }
      },
    }
  },
}

export default rule
