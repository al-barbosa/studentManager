import { Request, Response } from 'express';
import RequestService from '../services/requestService';
import IError from '../interface/errorInterface';

export default class RequestsController {
  requestService = new RequestService();

  /**
   * Obtém todas as solicitações.
   * @param _req O objeto de requisição, dispensável.
   * @param res O objeto de resposta.
   * @returns Uma Promise contendo a resposta da requisição com a lista de todas as solicitações.
   */
  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const allRequests = await this.requestService.getAll();
      return res.status(200).json(allRequests);
    } catch (e) {
      const { code, message } = e as IError;
      return res.status(code).json({ message });
    }
  };

  /**
   * Cria uma nova solicitação.
   * @param req O objeto de requisição contendo as informações da nova solicitação.
   * @param res O objeto de resposta.
   * @returns Uma Promise contendo a resposta da requisição com os detalhes da solicitação criada.
   */
  public createNewRequest = async (req: Request, res: Response): Promise<Response> => {
    try {
      const createdRequest = await this.requestService.createRequest(req.body);
      return res.status(200).json(createdRequest);
    } catch (e) {
      const { code, message } = e as IError;
      return res.status(code).json({ message });
    }
  };

  /**
   * Deleta uma solicitação com base no ID fornecido.
   * @param req O objeto de requisição contendo o parâmetro ID.
   * @param res O objeto de resposta.
   * @returns Uma Promise contendo a resposta da requisição indicando que a solicitação foi deletada com sucesso.
   */
  public deleteRequest = async (req: Request, res: Response): Promise<Response> => {
    try {
      const deletedRequest = await this.requestService.deleteRequest(req.params.id);
      return res.status(200).json(deletedRequest);
    } catch (e) {
      const { code, message } = e as IError;
      return res.status(code).json({ message });
    }
  };

  /**
   * Aceita uma solicitação.
   * @param req O objeto de requisição contendo os parâmetros user e cat.
   * @param res O objeto de resposta.
   * @returns Uma Promise contendo a resposta da requisição indicando que a solicitação foi aceita.
   */
  public acceptRequest = async (req: Request, res: Response): Promise<Response> => {
    try {
      const acceptedRequest = await this.requestService.acceptRequest(req.params.user, req.params.cat);
      return res.status(200).json(acceptedRequest);
    } catch (e) {
      const { code, message } = e as IError;
      return res.status(code).json({ message });
    }
  };
}