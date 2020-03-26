import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RouterModule, Routes } from "nest-router";
import { AuthModule } from "./auth/auth.module";
import { PriceRecordsModule } from "./priceRecords/priceRecords.module";
import { UsersModule } from "./users/users.module";

const routes: Routes = [
  {
    path: "/api",
    children: [
      {
        path: "/auth",
        module: AuthModule,
      },
      {
        path: "/priceRecords",
        module: PriceRecordsModule,
      },
    ],
  },
];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env.development", ".env.development.local", ".env.production", ".env.production.local"],
    }),
    TypeOrmModule.forRoot(),
    RouterModule.forRoutes(routes),
    PriceRecordsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
