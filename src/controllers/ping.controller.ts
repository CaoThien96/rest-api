import { Get, Route, Tags } from "tsoa";

interface PingResponse {
  message: string;
}

@Route("api/ping")
@Tags("Ping")
export default class PingController {
  @Get("/")
  public async getMessage(): Promise<PingResponse> {
    return {
      message: "pong",
    };
  }
}