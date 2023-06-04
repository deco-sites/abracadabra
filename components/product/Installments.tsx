interface Props {
  installments: string | null;
}

const Installments = ({ installments }: Props) => {
  let installmentsText = null;

  if (installments) {
    const installmentsRegex = /((\d{1,2}x)|(R\$\s\d+(?:\.|\,)\d{2}))/g;
    const installmentsRegexArray = installments.match(installmentsRegex);

    if (installmentsRegexArray && installmentsRegexArray[0] !== "1x") {
      installmentsText = installments;
    }

    // console.log(installmentsText);
  }
  return installmentsText
    ? (
      <div>
        {installmentsText}
      </div>
    )
    : null;
};

export default Installments;
