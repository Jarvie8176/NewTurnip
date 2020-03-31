import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { AddPriceRecords } from "@turnip-market/dtos";
import { User } from "../auth/auth.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ValidatedUser } from "../users/users.interface";
import { AddPriceRecordsDto } from "./dtos/addPriceRecords.dto";
import { GetPriceRecordsDto } from "./dtos/getPriceRecords.dto";
import { PriceRecordsService } from "./priceRecords.service";

@Controller()
export class PriceRecordsController {
  constructor(private readonly priceRecordsService: PriceRecordsService) {}

  @Get()
  async getPriceRecords(): Promise<GetPriceRecordsDto> {
    const priceRecords = await this.priceRecordsService.getAllRecords();
    return { data: { priceRecords } };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "adds a price record and link to current user" })
  async addPriceRecord(
    @User() user: ValidatedUser.Type,
    @Body() input: AddPriceRecords.Request.Type
  ): Promise<AddPriceRecordsDto> {
    const priceRecord = await this.priceRecordsService.addRecord({ input, user });
    return { data: { priceRecord } };
  }
}
