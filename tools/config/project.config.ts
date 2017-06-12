import { join } from 'path';

import { SeedConfig } from './seed.config';
import { ExtendPackages } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';
    // this.GOOGLE_ANALYTICS_ID = 'Your site's ID';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      {src: 'hammerjs/hammer.min.js', inject: 'libs'}
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    // Add packages (e.g. ng2-translate)
    let additionalPackages: ExtendPackages[] = [
                     {
                        name:'@ngrx/core',
                        path:'node_modules/@ngrx/core/bundles/core.umd.js',
                        packageMeta:{
                          main: 'index.js',
                          defaultExtension: 'js',
                        }
                      },
                     {
                        name:'@ngrx/effects',
                        path:'node_modules/@ngrx/effects/bundles/effects.umd.js',
                        packageMeta:{
                          main: 'index.js',
                          defaultExtension: 'js',
                        }
                      },
                     {
                        name:'@ngrx/store',
                        path:'node_modules/@ngrx/store/bundles/store.umd.js',
                        packageMeta:{
                          main: 'index.js',
                          defaultExtension: 'js',
                        }
                      },
                      {
                        name:'@angular/material',
                        path:'node_modules/@angular/material/bundles/material.umd.js',
                        packageMeta: {
                          main: 'index.js',
                          defaultExtension: 'js'
                        }
                      }
     ];
    this.addPackagesBundles(additionalPackages);

    /* Add proxy middlewar */
    // this.PROXY_MIDDLEWARE = [
    //   require('http-proxy-middleware')({ ws: false, target: 'http://localhost:3003' })
    // ];

    /* Add to or override NPM module configurations: */
    // this.PLUGIN_CONFIGS['browser-sync'] = { ghostMode: false };
  }

}
