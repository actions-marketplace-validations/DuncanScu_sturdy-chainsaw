import { IResult } from "./data";
import { formatTitleHtml, formatResultHtml } from "./formatting/html";

export class SummaryGenerator
{
  public generateSummary(title:string, testResult:IResult){
    return formatTitleHtml(title) + formatResultHtml(testResult);
  }
}
