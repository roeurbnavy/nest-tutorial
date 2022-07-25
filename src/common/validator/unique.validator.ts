// import { Injectable } from '@nestjs/common';
// import { InjectConnection } from '@nestjs/typeorm';
// import {
//   ValidationArguments,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
// } from 'class-validator';
// import { DataSource,FindConditions } from 'typeorm';

// @Injectable()
// @ValidatorConstraint({ name: 'exists', async: true })
// export class ExistValidator implements ValidatorConstraintInterface {
//   constructor(@InjectConnection() private readonly connection: DataSource) {}

//   public async validate<E>(value: string, args: ExistsValidationArguments<E>):{
//       const [EntityClass,FindConditions] = args.constraints;
//   }
// }
