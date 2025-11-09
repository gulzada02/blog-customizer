import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { FormEvent, useRef, useState } from 'react';


import styles from './ArticleParamsForm.module.scss';

import {
	OptionType,
	fontFamilyOptions, 
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions, 
	defaultArticleState,
	ArticleStateType
} from '../../constants/articleProps'

type TFormProps = {
  state: ArticleStateType;
  setState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({state, setState}:TFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formState, setFormState] = useState(state);
	const formRef = useRef<HTMLDivElement>(null);

	const handleSetOption = (fieldName: keyof ArticleStateType, selectedOption: OptionType) => {
    setFormState(prev => ({ ...prev, [fieldName]: selectedOption }));
  };

  	const handleResetForm = () => {
    setFormState(defaultArticleState);
    setState(defaultArticleState);
  };

  	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState(formState);
  };

	return (
		<>
      <ArrowButton
        isOpen={isFormOpen}
        onClick={() => setIsFormOpen(!isFormOpen)}
      />
      <aside
        className={`${styles.container} ${isFormOpen ? styles.container_open : ''}`}
        ref={formRef}
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <Text size={31} weight={800} uppercase>
            Задайте параметры
          </Text>

          <Select
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={option => handleSetOption('fontFamilyOption', option)}
            title="Шрифт"
          />

          <RadioGroup
            selected={formState.fontSizeOption}
            options={fontSizeOptions}
            onChange={option => handleSetOption('fontSizeOption', option)}
            name="radioGroup"
            title="Размер шрифта"
          />

          <Select
            selected={formState.fontColor}
            options={fontColors}
            onChange={option => handleSetOption('fontColor', option)}
            title="Цвет шрифта"
          />

          <Separator />

          <Select
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={option => handleSetOption('backgroundColor', option)}
            title="Цвет фона"
          />

          <Select
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={option => handleSetOption('contentWidth', option)}
            title="Ширина контента"
          />

          <div className={styles.bottomContainer}>
            <Button
              title="Сбросить"
              onClick={handleResetForm}
              htmlType="reset"
              type="clear"
            />
            <Button
              title="Применить"
              htmlType="submit"
              type="apply"
            />
          </div>
        </form>
      </aside>
    </>
	);
};
