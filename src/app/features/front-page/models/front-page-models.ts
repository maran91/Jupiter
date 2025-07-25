export interface FrontPageModels {
    id: number;
    heading: string;
    primaryCategoryId: number;
    type: string;
    parentContentPath: string;
    scheduleStart: number;
    subHeading: string;
    hasActiveMedia: boolean;
    rootContentId: number;
    rootCategoryId: number;
    canonicalUrl: string;
    fancyUrl: string;
    anotherDomainContent: boolean;
    verticalPhotos: Photo[];
    squarePhotos: Photo[];
}

export interface Photo {
    id: number;
    ord: number;
    type: number;
    created: number;
    version: number;
    format: string;
    captionEt: string;
    captionEn: string;
    captionRu: string;
    authorEt: string;
    authorEn: string;
    authorRu: string;
    photoTypes: Record<number, PhotoType>;
    photoUrlOriginal: string;
    photoUrlBase: string;
}

export interface PhotoType {
    type: number;
    w: number;
    h: number;
    url: string;
}

export interface Ribbon {
    header: string;
    title: string;
    highTimeline: boolean;
    data: FrontPageModels[];
}

export interface FrontendResponse {
    data: {
        category: {
            frontPage: Ribbon[];
        };
    };
}
