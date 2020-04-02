import { message } from "antd";
import { NotificationDto } from "./notification.dto";

export default class NotificationManager {
  static ShowError(err: Error): void {
    const title = "";
    const content = err.message;

    const notification: NotificationDto = { title, content };
    message.error(NotificationManager.ToMessage(notification));
  }

  static ShowInfo(content: string) {
    const notification: NotificationDto = { content };
    message.info(NotificationManager.ToMessage(notification));
  }

  private static ToMessage(notification: NotificationDto): string {
    const { title, content } = notification;
    return [title, content].join("\n");
  }
}
