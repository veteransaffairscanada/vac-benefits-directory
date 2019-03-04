import { css } from "emotion";
const styles = css`
  .article.panel:hover,
  .card-container:hover,
  .transition-panel:hover {
    transform: translateY(-2px);
    transition: all 0.5s;
  }

  .article.panel:hover img,
  .card-container:hover img,
  .transition-panel:hover img {
    transform: scale(1.02);
    transition: all 0.5s;
  }

  .article.panel,
  .article.panel img,
  .card-container,
  .card-container img,
  .transition-panel,
  .transition-panel img {
    transition: all 0.5s;
  }

  .card-container img,
  .article.panel img,
  .transition-panel img {
    transform: scale(1.01);
  }

  .article.panel,
  .card-container,
  .card-container .eqht-trgt {
    overflow: hidden;
  }

  .card-container .article-brdr {
    border: 1px solid #d5e2e9;
    background-color: #fff;
  }

  .slick-arrow:hover:before {
    color: #575e65 !important;
    transition: color 0.5s;
  }

  .slick-arrow:before {
    transition: color 0.5s;
  }
`;

export default styles;
