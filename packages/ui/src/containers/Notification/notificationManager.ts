import { message } from "antd";
import { NotificationDto } from "./notification.dto";

export default class NotificationManager {
  static ShowError(err: Error): void {
    const title = `Error: ${err.message}`;
    const content = err.stack;

    const notification: NotificationDto = { title, content };
    message.error(NotificationManager.ToMessage(notification));
  }

  private static ToMessage(notification: NotificationDto): string {
    const { title, content } = notification;
    return `${title}\n${content}`;
  }
}
