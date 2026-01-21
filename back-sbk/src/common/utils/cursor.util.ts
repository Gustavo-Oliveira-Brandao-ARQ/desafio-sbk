export class CursorUtil {
  static encode(data: string): string {
    return Buffer.from(data).toString('base64');
  }

  static decode(cursor: string): string {
    return Buffer.from(cursor, 'base64').toString('ascii');
  }
}
