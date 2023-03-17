import fs from 'fs';
import path from 'path';
import { IResult } from "./data";
import parseTrx from './parsers/trx';
import { log, setFailed, setResultOutputs } from "./utils";

export class TestReportProcessor{

    constructor(){
    }
  
    public async processReports(reportPath :string): Promise<IResult>{
      const result = this.DefaultTestResult;
      const filePaths = this.findReportsInDirectory(reportPath, '.trx');
      if (!filePaths.length) {
        throw Error(`No test results found in ${reportPath}`);
      }
    
      for (const path of filePaths) {
        await this.processResult(path, result);
      }
    
      setResultOutputs(result);
    
      if (!result.success) {
        setFailed('Tests Failed');
      }
    
      return result;
    }
  
    private findReportsInDirectory(directoryPath: string, extension: string): string[]{
      try {
        if (!fs.existsSync(directoryPath)) {
          return [];
        }
    
        const fileNames = fs.readdirSync(directoryPath);
        const filteredFileNames = fileNames.filter(fileName => fileName.endsWith(extension));
        return filteredFileNames.map(fileName => path.join(directoryPath, fileName));
      } catch {
        return [];
      }
    }
  
    private async processResult(path: string, aggregatedResult: IResult): Promise<void> {
      const result = await parseTrx(path);
    
      if (!result) {
        throw Error(`Failed parsing ${path}`);
      }
    
      log(`Processed ${path}`);
      this.mergeTestResults(aggregatedResult, result);
    };
  
    private mergeTestResults(result1: IResult, result2: IResult): void {
      result1.success = result1.success && result2.success;
      result1.elapsed += result2.elapsed;
      result1.total += result2.total;
      result1.passed += result2.passed;
      result1.failed += result2.failed;
      result1.skipped += result2.skipped;
      result1.suits.push(...result2.suits);
    };
  
    private DefaultTestResult: IResult = {
      success: true,
      elapsed: 0,
      total: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      suits: []
    };
  }