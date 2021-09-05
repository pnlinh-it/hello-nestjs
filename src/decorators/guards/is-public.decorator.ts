import { IS_PUBLIC_KEY } from '../../constant/constant';
import { SetMetadata } from '@nestjs/common';

export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
