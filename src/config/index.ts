import production from './production'
import development from './development'
import IConfig from './index.d';

let config: IConfig;
if (process.env.NODE_ENV === 'production') {
    config = production;
} else {
    config = development;
}

export default config