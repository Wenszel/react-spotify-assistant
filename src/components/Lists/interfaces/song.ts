import artist from "./artists";
export default interface song {
    album: { images: { url: string }[] };
    uri: string;
    name: string;
    artists: Array<artist>;
}
