-- CreateTable
CREATE TABLE "conta" (
    "id_conta" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "id_assinatura" INTEGER NOT NULL,
    "situacao" INTEGER NOT NULL,
    "data_vencimento" TIMESTAMP(3) NOT NULL,
    "data_pagamento" TIMESTAMP(3) NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "conta_pkey" PRIMARY KEY ("id_conta")
);

-- AddForeignKey
ALTER TABLE "conta" ADD CONSTRAINT "conta_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conta" ADD CONSTRAINT "conta_id_assinatura_fkey" FOREIGN KEY ("id_assinatura") REFERENCES "assinatura"("id_assinatura") ON DELETE RESTRICT ON UPDATE CASCADE;
