import { getSectionLink } from './common';

export const formatHeaderMarkdown = (header: string): string => `## ${header}\n`;

export const formatFooterMarkdown = (commit: string): string =>
  `<br/>_✏️ updated for commit ${commit.substring(0, 8)}_`;

