export interface Warningbar {
  text: string;
}

function Warningbar() {
  return (
    <div class="bg-red-base py-2 text-sm text-white">
      <div class="flex justify-between items-center max-w-max mx-auto">
        <p>
          <strong>20% de Cashback </strong> c/ cupom{" "}
          <strong>SUPERCASH20 </strong>
          no PIX/boleto ou <strong>10% </strong> c/ <strong>CASH10 </strong> no
          cartão
        </p>
      </div>
    </div>
  );
}

export default Warningbar;
