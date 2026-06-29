export default function DownloadCard({
  eyebrow = "Private Customer Access",
  eyebrowI18nKey = "downloadPages.privateAccess",
  title = "Thank you for your trust in DBL",
  titleI18nKey = "downloadPages.title",
  message,
  messageI18nKey,
  downloadHref,
  buttonLabel,
  buttonI18nKey,
  supportLabel = "If you face any issue, contact us:",
  supportI18nKey = "downloadPages.support",
}) {
  return (
    <section className="download-panel reveal in-view">
      <span className="eyebrow" data-i18n={eyebrowI18nKey}>
        {eyebrow}
      </span>
      <h1 data-i18n={titleI18nKey}>{title}</h1>
      {message ? <p data-i18n={messageI18nKey}>{message}</p> : null}
      {downloadHref ? (
        <a className="btn btn-primary download-btn" href={downloadHref} download data-i18n={buttonI18nKey}>
          {buttonLabel}
        </a>
      ) : null}
      <div className="download-support">
        <p data-i18n={supportI18nKey}>{supportLabel}</p>
        <a href="mailto:dblueprintlab@gmail.com">dblueprintlab@gmail.com</a>
        <a href="https://wa.me/967736747842" data-i18n="downloadPages.whatsapp">
          WhatsApp: +967736747842
        </a>
      </div>
    </section>
  );
}
