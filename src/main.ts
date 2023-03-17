import { getInputs, publishComment, setFailed, setSummary } from './utils';
import { formatResultMarkdown } from './formatting/markdown';
import { formatResultHtml, formatTitleHtml } from './formatting/html';
import { TestReportProcessor } from './TestReportProcessor';

const run = async (): Promise<void> => {
  try {
    const {
      token,
      title,
      resultsPath
    } = getInputs();

    // Getting the test results
    const testReportProcessor = new TestReportProcessor();
    var testResult = await testReportProcessor.processReports(resultsPath)


    // Generating the report
    let comment = '';
    let summary = formatTitleHtml(title);

    comment += formatResultMarkdown(testResult);
    summary += formatResultHtml(testResult);

    await setSummary(summary);

    // Publishing results
    await publishComment(token, title, comment);
  } catch (error) {
    setFailed((error as Error).message);
  }
};


run()