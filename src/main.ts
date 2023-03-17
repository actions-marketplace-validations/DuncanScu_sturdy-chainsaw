import { processTestResults } from './results';
import { getInputs, publishComment, setFailed, setSummary } from './utils';
import { formatResultMarkdown } from './formatting/markdown';
import { formatResultHtml, formatTitleHtml } from './formatting/html';

const run = async (): Promise<void> => {
  try {
    const {
      token,
      title,
      resultsPath
    } = getInputs();

    let comment = '';
    let summary = formatTitleHtml(title);

    const testResult = await processTestResults(resultsPath);
    comment += formatResultMarkdown(testResult);
    summary += formatResultHtml(testResult);

    await setSummary(summary);
    await publishComment(token, title, comment);
  } catch (error) {
    setFailed((error as Error).message);
  }
};


run()