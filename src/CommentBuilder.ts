import { IResult } from "./data";
import { formatFooterMarkdown, formatHeaderMarkdown, formatResultMarkdown, formatSummaryLinkMarkdown } from "./formatting/markdown";
import { getContext, IContext } from "./utils";

export class CommentBuilder {
    private _header: string = "";
    private _summaryLink: string = "";
    private _footer: string = "";
    private _message: string = "";
    private _context : IContext;
    private _title: string = "";
  
    constructor(testResult:IResult){
      this._message = formatResultMarkdown(testResult);
      this._context = getContext();
    }
  
    public WithHeader(title:string = "Tests") : CommentBuilder {
      this._title = title;
      this._header = formatHeaderMarkdown(title);
      return this;
    }
  
    public WithSummaryLink() : CommentBuilder {
      this._summaryLink = formatSummaryLinkMarkdown(this._context.owner, this._context.repo, this._context.runId, this._title);
      return this;
    }
  
    public WithFooter() : CommentBuilder {
      this._footer = this._context.commit ? formatFooterMarkdown(this._context.commit) : '';
      return this;
    }
  
    public Build() : string {
      return `${this._header}${this._message}${this._summaryLink}${this._footer}`;
    }
  }