import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export const ConvertMarkdownToHTML = (markdown: string) => {
  const processedContent = remark()
    .use(remarkHtml)
    .use(remarkGfm)
    .processSync(markdown);

  return processedContent.toString();
};
