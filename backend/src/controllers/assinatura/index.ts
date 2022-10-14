import { PrismaUsuarioRepository } from "@repositories/implementations/usuario.repository";
import { PrismaClienteRepository } from "@repositories/implementations/cliente.repository";
import { PrismaAssinaturaRepository } from "@repositories/implementations/assinatura.repository";
import { PrismaContaRepository } from "@repositories/implementations/conta.repository";

import { FindAssinaturaByIdAssinaturaUseCase, FindManyAssinaturaUseCase, ValidateAssinaturaCreateUseCase, CreateAssinaturaUseCase, ValidateAssinaturaAlterUseCase, AlterAssinaturaSituacaoUseCase, AlterAssinaturaUseCase, DeleteAssinaturaUseCase, GenerateContaAssinaturaUseCase, GenerateContasAssinaturaVencimentoProximoUseCase } from "@use-cases/assinatura";

import { FindAssinaturaByIdAssinaturaController } from "./findAssinatura.controller";
import { FindManyAssinaturaController } from "./findManyAssinatura.controller";
import { CreateAssinaturaController } from "./createAssinatura.controller";
import { AlterAssinaturaController } from "./alterAssinatura.controller";
import { DeleteAssinaturaController } from "./deleteAssinatura.controller";
import { AlterAssinaturaSituacaoController } from "./alterAssinaturaSituacao.controller";
import { GenerateContaAssinaturaController } from "./generateContaAssinatura.controller";
import { GenerateContasAssinaturaVencimentoProximoController } from "./generateContasAssinaturaVencimentoProximo.useCase";
import { AuthUseCase } from "@use-cases/auth/auth.useCase";

const usuarioRepository = new PrismaUsuarioRepository();
const clienteRepository = new PrismaClienteRepository();
const assinaturaRepository = new PrismaAssinaturaRepository();
const contaRepository = new PrismaContaRepository();

const findAssinaturaByIdAssinaturaController = new FindAssinaturaByIdAssinaturaController(new FindAssinaturaByIdAssinaturaUseCase(assinaturaRepository));
const findManyAssinaturaController = new FindManyAssinaturaController(new AuthUseCase(usuarioRepository), new FindManyAssinaturaUseCase(assinaturaRepository));
const createAssinaturaController = new CreateAssinaturaController(new ValidateAssinaturaCreateUseCase(clienteRepository), new CreateAssinaturaUseCase(assinaturaRepository));
const alterAssinaturaController = new AlterAssinaturaController(new ValidateAssinaturaAlterUseCase(assinaturaRepository), new AlterAssinaturaUseCase(assinaturaRepository), new FindAssinaturaByIdAssinaturaUseCase(assinaturaRepository));
const deleteAssinaturaController = new DeleteAssinaturaController(new FindAssinaturaByIdAssinaturaUseCase(assinaturaRepository), new DeleteAssinaturaUseCase(assinaturaRepository, contaRepository));
const alterAssinaturaSituacaoController = new AlterAssinaturaSituacaoController(new AlterAssinaturaSituacaoUseCase(assinaturaRepository));
const generateContaAssinaturaController = new GenerateContaAssinaturaController(new GenerateContaAssinaturaUseCase(assinaturaRepository, contaRepository))
const generateContasAssinaturaVencimentoProximoController = new GenerateContasAssinaturaVencimentoProximoController(new GenerateContasAssinaturaVencimentoProximoUseCase(assinaturaRepository, contaRepository));

export {
  findAssinaturaByIdAssinaturaController, findManyAssinaturaController,
  createAssinaturaController, alterAssinaturaController, deleteAssinaturaController, alterAssinaturaSituacaoController,
  generateContaAssinaturaController, generateContasAssinaturaVencimentoProximoController,
}