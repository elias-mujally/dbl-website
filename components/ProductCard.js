export default function ProductCard({
  as: Component = "article",
  className = "product-card",
  image,
  imageAlt,
  imageAltI18nKey,
  eyebrow,
  eyebrowI18nKey,
  eyebrowClassName = "eyebrow",
  title,
  titleI18nKey,
  titleTag: TitleTag = "h3",
  description,
  descriptionI18nKey,
  price,
  priceI18nKey,
  originalPrice,
  originalPriceI18nKey,
  priceNote,
  priceNoteI18nKey,
  href,
  buttonLabel = "View Product",
  buttonI18nKey,
  reveal = false,
  contentWrapper,
}) {
  const classes = [className, reveal ? "reveal in-view" : ""].filter(Boolean).join(" ");
  const shouldWrapContent = contentWrapper ?? Boolean(image);
  const content = (
    <>
      {eyebrow ? (
        <span className={eyebrowClassName} data-i18n={eyebrowI18nKey}>
          {eyebrow}
        </span>
      ) : null}
      {title ? <TitleTag data-i18n={titleI18nKey}>{title}</TitleTag> : null}
      {description ? <p data-i18n={descriptionI18nKey}>{description}</p> : null}
      {price ? (
        <div className="category-product-price">
          <strong data-i18n={priceI18nKey}>{price}</strong>
          {originalPrice ? <del data-i18n={originalPriceI18nKey}>{originalPrice}</del> : null}
          {priceNote ? <span data-i18n={priceNoteI18nKey}>{priceNote}</span> : null}
        </div>
      ) : null}
      {href ? (
        <div className="button-row">
          <a className="btn btn-primary" href={href} data-i18n={buttonI18nKey}>
            {buttonLabel}
          </a>
        </div>
      ) : null}
    </>
  );

  return (
    <Component className={classes}>
      {image ? <img src={image} alt={imageAlt} data-i18n-alt={imageAltI18nKey} /> : null}
      {shouldWrapContent ? <div>{content}</div> : content}
    </Component>
  );
}
