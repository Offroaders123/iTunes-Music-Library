import { readFile } from "node:fs/promises";

const LIBRARY = "/Users/brandon/Music/Music/Music Library.musiclibrary/Library.musicdb";

const data = await readFile(LIBRARY);
console.log(data);

const db = parseLibrary(data);
console.log(db);

type MusicDBFileType = 6 | 5 | 4 | 2;

function parseLibrary(data: Uint8Array){
  const view = new DataView(data.buffer,data.byteOffset,data.byteLength);
  const decoder = new TextDecoder();

  const fileSignature: string = decoder.decode(data.subarray(0,4));
  const envelopeLength: number = view.getUint32(4,true);
  const fileLength: number = view.getUint32(8,true);
  const fileFormatMajor: number = view.getUint16(12,true);
  const fileFormatMinor: number = view.getUint16(14,true);
  const appleMusicVersion: string = decoder.decode(data.subarray(16,32));
  const libraryPersistentId: bigint = view.getBigUint64(48,true);
  const musicDbFileType: MusicDBFileType = view.getUint32(56,true) as MusicDBFileType;

  return {
    fileSignature,
    envelopeLength,
    fileLength,
    fileFormatMajor,
    fileFormatMinor,
    appleMusicVersion,
    libraryPersistentId,
    musicDbFileType
  };
}