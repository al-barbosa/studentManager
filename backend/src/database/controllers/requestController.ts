import { Request, Response } from 'express';
import RequestService from '../services/requestService';

export default class RequestsController {
  requestService = new RequestService();
  
  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const allRequests = await this.requestService.getAll();
      return res
        .status(200)
        .json(allRequests);
    } catch (e) {
      const { code, message } = e as any;
      return res
        .status(code)
        .json({ message });
    }
  };

  public createNewRequest = async (req: Request, res: Response): Promise<Response> => {
    try {
      const createdRequest = await this.requestService.createRequest(req.body);
      return res
        .status(200)
        .json(createdRequest);
    } catch (e) {
      const { code, message } = e as any;
      return res
        .status(code)
        .json({ message });
    }
  };

  public deleteRequest = async (req: Request, res: Response): Promise<Response> => {
    try {
      const deletedRequest = await this.requestService.deleteRequest(req.params.id);
      return res
        .status(200)
        .json(deletedRequest);
    } catch (e) {
      const { code, message } = e as any;
      return res
        .status(code)
        .json({ message });
    }
  };

  public acceptRequest = async (req: Request, res: Response): Promise<Response> => {
    try {
      const acceptedRequest = await this.requestService.acceptRequest(req.params.user, req.params.cat);
      return res
        .status(200)
        .json(acceptedRequest);
    } catch (e) {
      const { code, message } = e as any;
      return res
        .status(code)
        .json({ message });
    }
  };
}
