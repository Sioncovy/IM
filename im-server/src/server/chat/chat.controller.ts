import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat, ChatDocument } from './entities/chat.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('chat')
export class ChatController {
  constructor(
    @InjectModel('chat') private chatModel: Model<ChatDocument>,
    private readonly chatService: ChatService,
  ) {}

  @Post('create')
  async create(@Body() createChatDto: CreateChatDto) {
    return await this.chatService.create(createChatDto);
  }

  @Get()
  async findAll(@Req() req) {
    const { username } = req.user;
    return await this.chatService.findAll(username);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.chatService.findOne();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
