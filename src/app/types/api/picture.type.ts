import { Project } from './project.type';

export type Picture = {
  id: number;
  label: string;
  slug: string;
  path: string;
  mimeType: MimeType;
  bytesSize: number;
  width: number;
  height: number;
  sha256: string;
  project: Project | null;
};

export type PictureForm = {
  id?: number;
  file?: File;
  label: string;
  slug: string;
  path?: string;
  mimeType?: MimeType;
  bytesSize?: number;
  width: number;
  height: number;
  sha256?: string;
  project?: number;
};

export type MimeType = 'png' | 'jpg' | 'jpeg' | 'webp' | 'svg';
