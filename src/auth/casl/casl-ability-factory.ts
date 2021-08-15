import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Action } from './action';
import { Injectable } from '@nestjs/common';
import { Article } from './article';
import { UserInterface } from '../../users/interfaces/user.interface';

type Subjects = InferSubjects<typeof Article | UserInterface> | 'all';
// https://casl.js.org/v5/en/advanced/typescript#application-ability

// A type that alias to Ability<[Action, Subjects]>
type AppAbility = Ability<[Action, Subjects]>;

// type AnyClass<ReturnType = any> = new (...args: any[]) => ReturnType;
// AnyClass is a constructor function
// Ability it self is a constructor function?
// A constructor variable
// We can also use const AppAbility = Ability as AbilityClass<AppAbility>;
// Maybe we can pass class to an constructor parameter, it has name as ...Class
const AppAbilityConstructor = Ability as AbilityClass<AppAbility>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: UserInterface) {
    // https://casl.js.org/v5/en/advanced/typescript#ability-builder-type-inference
    // Builder required a Ability class (function)
    // AbilityBuilder constructor required a constructor parameter
    // We can pass Ability to it: new AbilityBuilder(Ability)
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      AppAbilityConstructor,
    );

    if (user.isAdmin) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }

    can(Action.Update, Article, { authorId: user.id });
    cannot(Action.Delete, Article, { isPublished: true });

    return build({
      // https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}

// const ability = new CaslAbilityFactory().createForUser(null);
// ability.can(Action.Delete, Article);
