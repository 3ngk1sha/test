import { TFixtures, TFixturesDefaultValues } from './types';
export declare const getFixturesWithDefaultValues: <T, S = TFixtures<T>>({ fixtures, defaultValues, }: {
    fixtures: S[];
    defaultValues?: TFixturesDefaultValues<T> | undefined;
}) => S[];
