const imageMapper = (id: number) => {
  switch (id) {
    case 200:
    case 201:
    case 202:
    case 210:
    case 211:
    case 212:
    case 221:
    case 230:
    case 231:
    case 232:
      return "yNtTdAb96GE";

    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
      return "Uqho14G0xxU";

    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 511:
    case 520:
    case 521:
    case 522:
    case 531:
      return "uUySeXRQqA4";

    case 600:
    case 601:
    case 602:
    case 611:
    case 612:
    case 613:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622:
      return "qIHtrP2V3C8";

    case 701:
    case 721:
    case 741:
      return "od287vQyufw";

    case 711:
      return "IkKcbi70s3g";

    case 731:
    case 751:
    case 761:
      return "sBXVsMsfoEc";

    case 762:
      return "Y6vc_7-c-hg";

    case 771:
      return "-ZC3-IUKDeI";

    case 781:
      return "Uw0FsLHXKLM";

    case 800:
      return "u2noIycnSiY";

    case 801:
    case 802:
    case 803:
      return "xRvUIJiKavI";

    case 804:
      return "mK-LBRSG1rA";

    default:
      console.warn("a new code used", { id });
      return "xRvUIJiKavI";
  }
};

export default imageMapper;
