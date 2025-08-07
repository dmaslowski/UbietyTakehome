export type FontWeight =
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | 100
    | 200
    | 300
    | 400
    | 500
    | 600
    | 700
    | 800
    | 900
    | 'ultralight'
    | 'thin'
    | 'light'
    | 'medium'
    | 'regular'
    | 'semibold'
    | 'condensedBold'
    | 'condensed'
    | 'heavy'
    | 'black'
    | undefined;

export type Theme = {
    color: {
        primary: string;
        surface: string;
        background: string;
        text: string;
        border: string;
        error: string;
        shadow: string;
        onPrimary: string;
    };
    spacing: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
    };
    size: {
        md: number;
    }
    borderRadius: {
        sm: number;
        md: number;
        lg: number;
    };
    borderWidth: {
        none: number;
        sm: number;
        md: number;
    };
    opacity: {
        focused: number;
    };
    textStyle: {
        header: {
            fontSize: number;
            fontWeight: FontWeight;
            color: string;
        };
        subheader: {
            fontSize: number;
            fontWeight: FontWeight;
            color: string;
        };
        body: {
            fontSize: number;
            fontWeight: FontWeight;
            color: string;
        };
        bodyBold?: {
            fontSize: number;
            fontWeight: FontWeight;
            color: string;
        };
        caption: {
            fontSize: number;
            fontWeight: FontWeight;
            color: string;
        };
        numberInput: {
            fontSize: number;
            fontWeight: FontWeight;
            color: string;
        };
    };
};