declare module 'react-native-html-to-pdf' {
  interface PDFOptions {
    html: string;
    fileName?: string;
    directory?: string;
    base64?: boolean;
    width?: number;
    height?: number;
  }
  interface PDFResult {
    filePath?: string;
    base64?: string;
  }
  export function generatePDF(options: PDFOptions): Promise<PDFResult>;
}

declare module 'react-native-share' {
  interface ShareOptions {
    url?: string;
    urls?: string[];
    type?: string;
    title?: string;
    message?: string;
    subject?: string;
    failOnCancel?: boolean;
  }
  const Share: {
    open: (options: ShareOptions) => Promise<void>;
    shareSingle: (options: ShareOptions) => Promise<void>;
  };
  export default Share;
}
