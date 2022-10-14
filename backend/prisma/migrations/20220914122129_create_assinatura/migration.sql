-- CreateTable
CREATE TABLE "assinatura" (
    "id_assinatura" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "situacao" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_vencimento" TIMESTAMP(3) NOT NULL,
    "data_proximo_vencimento" TIMESTAMP(3) NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "assinatura_pkey" PRIMARY KEY ("id_assinatura")
);

-- AddForeignKey
ALTER TABLE "assinatura" ADD CONSTRAINT "assinatura_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id_cliente") ON DELETE RESTRICT ON UPDATE CASCADE;
