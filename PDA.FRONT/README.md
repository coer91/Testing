# IIS MIME Types
    extension: .webmanifest
    MIME Type: application/manifest+json

# DataWedge Profiles

Create Google chrome profile

Associated apps
    - com.android.chrome

### keystroke output
    - Enabled
        check

    - Action key character 
        Line feed

    - Key event options
        key event delay: 0 ms
        Send Characters as Events: true
        Send Enter as string: true
        Send Tab as string: false
        Send Control Characteres as Events: true

    - DataWedge keyboard options
        Display DataWedge keyboard: true
        Keyboard display timeout: 10seg

    - Data formatting and ordering
        Send tokens: disabled
        Barcode separator: none

    - Advanced data formatting
        Enabled: false
        Rules: ''

    - Basic data formatting
        Enabled: true
        Prefix to data: ''
        Sufix to data: ''
        Send data: true
        Send as hex: false
        Send TAB key: false
        Send ENTER key: true

 constructor() { super('MM_LM0201', TRANSLATORY) } 
    protected override readonly TRANSLATORY = new TRANSLATORY(this.language()); 

  constructor(@Inject(String) pageName: string, @Inject({}) translator: any = null) {
        super(pageName);
         
        if(Tools.IsNotNull(translator)) {
            this.translatoryRef$ = effect(() => 
                Tools.Sleep().then(() => this.TRANSLATORY = new translator(this.language()))
            ); 
        }
    }