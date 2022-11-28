export interface IApplication {
  configureServices(): void;
  setupDB(): Promise<void>;
  setupServer(): void;
  listen(): void;
}
