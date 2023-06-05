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
  }
  return installmentsText
    ? (
      <div class="text-sm leading-[22px]">
        {installmentsText}
      </div>
    )
    : null;
};

export default Installments;
