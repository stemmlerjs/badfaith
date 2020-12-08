
export class TextUtils {
  public static stripSpecialCharacters (text: string): string {
    return text.replace('?', '');
  }
}