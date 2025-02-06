const createRoute = (path: string) => `/app/${path}`;

const ConstantRoutes = {
    // Public routes
    HOME: '/',

    // Private routes
    APP: 'app',
    CREATE_PRODUCT: createRoute('create-product'),
    SETTINGS: createRoute('settings'),
};

export default ConstantRoutes;
