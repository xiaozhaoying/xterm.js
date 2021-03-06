import { assert } from 'chai';
import * as Terminal from '../xterm';
import * as Clipboard from './Clipboard';


describe('evaluateCopiedTextProcessing', function () {
  it('should strip trailing whitespaces and replace nbsps with spaces', function () {
    let nonBreakingSpace = String.fromCharCode(160),
        copiedText = 'echo' + nonBreakingSpace + 'hello' + nonBreakingSpace,
        processedText = Clipboard.prepareTextForClipboard(copiedText);

    // No trailing spaces
    assert.equal(processedText.match(/\s+$/), null);

    // No non-breaking space
    assert.equal(processedText.indexOf(nonBreakingSpace), -1);
  });
});

describe('evaluatePastedTextProcessing', function () {
  it('should replace carriage return + line feed with line feed on windows', function () {
    const pastedText = 'foo\r\nbar\r\n',
          processedText = Clipboard.prepareTextForTerminal(pastedText, false),
          windowsProcessedText = Clipboard.prepareTextForTerminal(pastedText, true);

    assert.equal(processedText, 'foo\r\nbar\r\n');
    assert.equal(windowsProcessedText, 'foo\nbar\n');
  });
});
