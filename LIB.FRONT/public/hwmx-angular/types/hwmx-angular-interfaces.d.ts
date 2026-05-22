interface IHttpResponse<T> {
    data: T;
    status: number;
    message: string;
    ok: boolean;
}

interface IUser {
    UserId: number;
    User: string;
    RoleId: number;
    Role: string;
    PartnerId: number;
    Partner: string;
    FullName: string;
    Email: string;
    JWT: string;
    Roles: string[];
    Language: string;
}

interface ILoginResponse extends IUser {
    Message: string;
}

interface IMenu {
    Id?: number;
    Label: string;
    Icon?: string;
    Path?: string;
    MenuType?: 'LIST' | 'GRID' | 'PAGE';
    ShowIndicator?: boolean;
    CanCreate?: boolean;
    CanUpdate?: boolean;
    CanDelete?: boolean;
    ActiveKey?: string;
    Sequence?: number;
    Items?: IMenu[];
}

interface IUserRole {
    Id: number;
    UserId: number;
    User: string;
    RoleId: number;
    Role: string;
    IsMain: boolean;
}

interface ILogin {
    User: string;
    Password: string;
}

interface IAuthService {
    Login: ((login: ILogin) => Promise<IHttpResponse<ILoginResponse>>) | ILoginResponse;
    RecoveryPassword?: (userEmail: string) => Promise<IHttpResponse<ILogin>>;
    SetPassword?: (login: ILogin) => Promise<IHttpResponse<string>>;
    UpdateJWT?: () => Promise<IHttpResponse<string>>;
    SetUserRoleMain?: (userId: number, roleId: string | number) => Promise<IHttpResponse<IUserRole>>;
    GetNavigation?: (projectId: number) => Promise<IHttpResponse<IMenu[]>>;
}

interface IJWT {
    jwt: string;
    minutes: number;
    claims: any;
}

interface IEnvironments {
    info: 'DEVELOPMENT' | 'STAGING' | 'PRODUCTION';
    isDevelopment: boolean;
    isStaging: boolean;
    isProduction: boolean;
}

interface IAppSettings {
    appInfo: {
        id: number;
        project: string;
        title: string;
        version: string;
        imageURL: string;
        company: string;
    };
    environment: IEnvironments;
    background: {
        home: string;
        login: string;
    };
    security: {
        useJWT: boolean;
    };
    region: {
        dateTime: 'MDY' | 'DMY';
        language: 'es' | 'en' | 'ko';
        currencyCode: 'MXN' | 'USD' | 'KRW';
        currency: '$' | '₩' | '€';
    };
    navigation: {
        static: boolean;
        showHome: boolean;
        redirectTo: string;
    };
}

interface IScanner {
    code: string;
    operation: 'EMIT' | 'ENTER' | 'AUTOCLEAN';
}

interface IScreenSize {
    width: number;
    height: number;
    breakpoint: 'mv' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

interface ICallbackItem<T> {
    property: string;
    value: any;
    row: T;
}

interface IBodySettings<T> {
    showStriped?: boolean;
    showBorders?: boolean;
    showHover?: boolean;
    selectionRows?: ISelectionRow;
    deleteButton?: IRowButtonDelete<T>;
    editButton?: IRowButton<T>;
    modalButton?: IRowButton<T>;
    navigateButton?: IRowButton<T>;
    focusNext?: boolean;
    paginator?: IPaginator;
}
interface IRowButton<T> {
    show?: boolean | ((item: ICallbackItem<T>) => boolean);
    position?: 'left' | 'right';
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light';
    path?: (item: ICallbackItem<T>) => string;
}
interface IRowButtonDelete<T> extends IRowButton<T> {
    showConfirmation?: boolean;
    displayProperty?: string;
    preventDefault?: boolean;
}
interface ISelectionRow {
    show: boolean;
    selectAllowed?: number | null;
    selectOverRow?: boolean;
}
interface ISort {
    property: string;
    direction: 'ascendant' | 'descendant' | 'none';
    icon: string;
}
interface IPaginator {
    pageByRow?: number;
}

interface IInputChange<T> {
    position: 'HEADER' | 'BODY' | 'FOOTER';
    input: 'inputSearch' | 'inputTextbox' | 'inputSwitch' | 'inputNumberbox' | 'inputSelectbox' | 'inputDatebox';
    property?: string;
    before?: T;
    after?: T;
    value: any;
}
interface IInputEnter<T> {
    id: string;
    input: 'inputSearch' | 'inputTextbox' | 'inputSwitch' | 'inputNumberbox' | 'inputSelectbox' | 'inputDatebox';
    property?: string;
    row?: T;
    value: any;
}
interface IImportButton<T> {
    data: T[];
    file: File | null;
    autofill: boolean;
}
interface ISelectedRow<T> {
    all: boolean;
    checked: boolean;
    rows: T[];
}
interface ICellSwitch {
    showInput: boolean;
    isReadonly?: boolean;
    type?: 'switch' | 'checkbox';
    tooltip?: string;
    tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information';
}
interface ICellTextBox {
    showInput: boolean;
    isValid?: boolean;
    isInvalid?: boolean;
    placeholder?: string;
    selectOnFocus?: boolean;
    textPosition?: 'left' | 'center' | 'right';
    minLength?: number | string;
    maxLength?: number | string;
}
interface ICellNumberBox {
    showInput: boolean;
    isValid?: boolean;
    isInvalid?: boolean;
    placeholder?: string;
    selectOnFocus?: boolean;
    textPosition?: 'left' | 'center' | 'right';
    minLength?: number | string;
    maxLength?: number | string;
    format?: 'none' | 'number' | 'currency';
    decimals?: number;
    step?: number;
    showStepIcon?: boolean;
    min?: number;
    max?: number;
}
interface ICellSelectBox<T> {
    showInput: boolean;
    dataSource: T;
    isValid?: boolean;
    isInvalid?: boolean;
    placeholder?: string;
    selectOnFocus?: boolean;
    textPosition?: 'left' | 'center' | 'right';
    displayProperty?: string;
    useIconProperty?: boolean;
}
interface ICellDateBox {
}

interface IColumnConfig<T> {
    __index__: number;
    name: string;
    config: IColumn<T>;
}
interface IColumn<T> {
    property: string;
    alias?: string;
    short?: boolean;
    width?: string;
    height?: string;
    textBreak?: boolean;
    show?: boolean;
    textAlignX?: 'left' | 'center' | 'right';
    textAlignY?: 'top' | 'middle' | 'bottom';
    color?: null | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light' | ((item: ICallbackItem<T>) => null | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light');
    format?: 'string' | 'number' | 'currency' | 'date' | 'time' | 'datetime';
    template?: null | string | ((item: ICallbackItem<T>) => string);
    inputSwitch?: null | boolean | ((item: ICallbackItem<T>) => ICellSwitch);
    inputTextbox?: null | boolean | ((item: ICallbackItem<T>) => ICellTextBox);
    inputNumberbox?: null | boolean | ((item: ICallbackItem<T>) => ICellNumberBox);
    inputSelectbox?: null | ((item: ICallbackItem<T>) => ICellSelectBox<T>);
    inputDatebox?: null | boolean | ((item: ICallbackItem<T>) => ICellDateBox);
}

interface IDataSourceGroup {
    index: number;
    groupBy: string | null;
    rows: any[];
}

interface IFooterSettings<T> {
    show?: boolean;
}

interface IHeaderSettings {
    backButton?: IButton;
    cancelButton?: IButton;
    filterButton?: IButton;
    exportButton?: IButtonExport;
    importButton?: IButtonImport;
    addButton?: IButtonAdd;
    saveButton?: IButton;
    search?: ISearch;
    slotPosition?: 'left' | 'right';
    buttonType?: 'filled' | 'outline' | 'icon' | 'icon-rounded' | 'icon-filled' | 'icon-filled-rounded' | 'icon-outline' | 'icon-outline-rounded';
}
interface IButton {
    show: boolean;
    path?: string;
    tooltip?: string;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark' | 'light';
}
interface IButtonExport extends IButton {
    preventDefault?: boolean;
    fileName?: string;
    onlyColumnFiltered?: boolean;
    onlyFilteredRows?: boolean;
    onlySelectedRows?: boolean;
}
interface IButtonImport extends IButton {
    preventDefault?: boolean;
    Autofill?: boolean;
}
interface IButtonAdd extends IButton {
    preventDefault?: boolean;
    addTo?: 'start' | 'end';
}
interface ISearch {
    show: boolean;
    preventDefault?: boolean;
    properties?: string[] | null;
}

interface IBreakpointButton {
    type?: {
        mv?: 'filled' | 'outline' | 'icon' | 'icon-rounded' | 'icon-filled' | 'icon-filled-rounded' | 'icon-outline' | 'icon-outline-rounded';
        xs?: 'filled' | 'outline' | 'icon' | 'icon-rounded' | 'icon-filled' | 'icon-filled-rounded' | 'icon-outline' | 'icon-outline-rounded';
        sm?: 'filled' | 'outline' | 'icon' | 'icon-rounded' | 'icon-filled' | 'icon-filled-rounded' | 'icon-outline' | 'icon-outline-rounded';
        md?: 'filled' | 'outline' | 'icon' | 'icon-rounded' | 'icon-filled' | 'icon-filled-rounded' | 'icon-outline' | 'icon-outline-rounded';
        lg?: 'filled' | 'outline' | 'icon' | 'icon-rounded' | 'icon-filled' | 'icon-filled-rounded' | 'icon-outline' | 'icon-outline-rounded';
        xl?: 'filled' | 'outline' | 'icon' | 'icon-rounded' | 'icon-filled' | 'icon-filled-rounded' | 'icon-outline' | 'icon-outline-rounded';
        xxl?: 'filled' | 'outline' | 'icon' | 'icon-rounded' | 'icon-filled' | 'icon-filled-rounded' | 'icon-outline' | 'icon-outline-rounded';
    };
    width?: {
        mv?: string;
        xs?: string;
        sm?: string;
        md?: string;
        lg?: string;
        xl?: string;
        xxl?: string;
    };
}

interface IExternalButton {
    showLeft?: boolean;
    typeLeft?: 'icon' | 'icon-filled' | 'icon-outline';
    colorLeft?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark';
    iconLeft?: string;
    isReadonlyLeft?: boolean;
    showRight?: boolean;
    typeRight?: 'icon' | 'icon-filled' | 'icon-outline';
    iconRight?: string;
    isReadonlyRight?: boolean;
    colorRight?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navigation' | 'information' | 'dark';
}

interface ITitleBreadcrumb {
    page: string;
    path?: string | null;
    queryParams?: any;
    click?: (() => any);
}

interface ITitleGoBack {
    show: boolean;
    path?: string | null;
    queryParams?: any;
    click?: (() => void);
}

interface ITitleInformation {
    show: boolean;
    tooltip?: string | null;
}

interface IPatch {
    op: 'remove' | 'add' | 'replace';
    path: string;
    value: string | number | boolean | Date;
}

interface IHttpRequest<T> {
    url: string;
    body?: T | IPatch[] | {};
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
    queryParams?: {
        param: string;
        value: string | number | Date | boolean | null | undefined;
    }[];
    headers?: {
        header: string;
        value: string | number | null | undefined;
    }[];
}

interface IAppSource {
    page: string;
    path: string;
}

interface IMenuSelected {
    id: string;
    menu: IMenu;
    level: 'LV1' | 'LV2' | 'LV3';
    action: 'NONE' | 'OPEN' | 'CLOSED' | 'GRID';
    tree: {
        id: string;
        label: string;
        icon: string;
    }[];
}

interface IToolbarMenu {
    label: string;
    icon?: string;
    path?: string;
    preventDefault?: boolean;
}

interface IOption {
    Id: number;
    Name: string;
    About: string;
    IsActive: boolean;
}

export type { IAppSettings, IAppSource, IAuthService, IBodySettings, IBreakpointButton, IButton, IButtonAdd, IButtonExport, IButtonImport, ICallbackItem, ICellDateBox, ICellNumberBox, ICellSelectBox, ICellSwitch, ICellTextBox, IColumn, IColumnConfig, IDataSourceGroup, IEnvironments, IExternalButton, IFooterSettings, IHeaderSettings, IHttpRequest, IHttpResponse, IImportButton, IInputChange, IInputEnter, IJWT, ILogin, ILoginResponse, IMenu, IMenuSelected, IOption, IPaginator, IPatch, IRowButton, IRowButtonDelete, IScanner, IScreenSize, ISearch, ISelectedRow, ISelectionRow, ISort, ITitleBreadcrumb, ITitleGoBack, ITitleInformation, IToolbarMenu, IUser, IUserRole };
