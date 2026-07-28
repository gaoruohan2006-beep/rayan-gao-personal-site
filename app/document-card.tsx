import { Localized } from "./localized";
import { withBasePath } from "./site-data";

type LocalizedText = {
  zh: string;
  en: string;
};

type DocumentCardProps = {
  title: LocalizedText;
  description: LocalizedText;
  file: string;
  meta: LocalizedText;
  previewTitle: string;
};

export function DocumentCard({
  title,
  description,
  file,
  meta,
  previewTitle,
}: DocumentCardProps) {
  const documentUrl = withBasePath(file);

  return (
    <article className="document-card">
      <div className="document-card-header">
        <div className="pdf-mark" aria-hidden="true">PDF</div>
        <div>
          <p className="document-meta">
            <Localized zh={meta.zh} en={meta.en} />
          </p>
          <h3><Localized zh={title.zh} en={title.en} /></h3>
          <p className="document-description">
            <Localized zh={description.zh} en={description.en} />
          </p>
        </div>
      </div>

      <div className="document-actions">
        <a className="academic-button document-download" href={documentUrl} download>
          <Localized zh="下载 PDF" en="Download PDF" />
          <span aria-hidden="true">↓</span>
        </a>
        <a className="document-open" href={documentUrl} target="_blank" rel="noreferrer">
          <Localized zh="新窗口打开" en="Open in new tab" />
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="pdf-preview">
        <iframe
          loading="lazy"
          src={`${documentUrl}#view=FitH`}
          title={previewTitle}
        />
        <p>
          <Localized
            zh="如果浏览器未显示预览，请使用上方按钮打开或下载文件。"
            en="If the preview is unavailable, use the buttons above to open or download the file."
          />
        </p>
      </div>
    </article>
  );
}
