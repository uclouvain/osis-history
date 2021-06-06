/*
 *
 *   OSIS stands for Open Student Information System. It's an application
 *   designed to manage the core business of higher education institutions,
 *   such as universities, faculties, institutes and professional schools.
 *   The core business involves the administration of students, teachers,
 *   courses, programs and so on.
 *
 *   Copyright (C) 2015-2021 Université catholique de Louvain (http://www.uclouvain.be)
 *
 *   This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   A copy of this license - GNU General Public License - is available
 *   at the root of the source code of this program.  If not,
 *   see http://www.gnu.org/licenses/.
 *
 */

import Timeline from './Timeline';

const mockEntries = [{
  author: 'John Doe',
  created: '06/04/2021 16:23',
  message: 'Ut molestiae aliquam tenetur est veritatis dolorum tempora. Eaque similique et qui ea consequatur illum dignissimos. Ullam qui vel qui quo. Ea dolor quasi quibusdam quia illum sunt aspernatur. Eveniet odio quos ad.',
}, {
  author: 'Alice Smith',
  created: '03/04/2021 16:23',
  message: 'Nulla natus dolores dolor. Voluptatem numquam doloribus architecto non praesentium. Sit facilis vitae sapiente. Placeat est qui et.',
}, {
  author: 'Bob Martin',
  created: '01/04/2021 08:23',
  message: 'Corrupti reiciendis laboriosam repellat adipisci quis. Iure omnis cum nihil accusantium ut doloribus nisi. Ut itaque suscipit et nulla iste enim. Assumenda quis et ullam temporibus quidem rerum nostrum. Rerum debitis quae qui ea molestiae animi minus optio.',
}, {
  author: 'John Doe',
  created: '28/03/2021 10:00',
  message: 'Sed et aut recusandae magni. Et aperiam dolores tempora. Eum et enim quia amet maxime quaerat earum. Quam fuga odit alias. Et repellendus accusantium corporis. Nihil et harum tenetur dolorum cum qui.',
}];

const Template = (args, { argTypes }) => ({
  components: { Timeline },
  props: Object.keys(argTypes),
  template: '<Timeline v-bind="$props" v-on="$props" />',
});

export const noHistory = Template.bind({});
export const horizontal = Template.bind({});
horizontal.args = {
  entries: mockEntries,
  horizontal: true,
};
export const vertical = Template.bind({});
vertical.args = {
  entries: mockEntries,
};

export default {
  title: 'Timeline',
};
