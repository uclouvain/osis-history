var s=Object.defineProperty;var i=(e,n)=>s(e,"name",{value:n,configurable:!0});import{T as o}from"./TableHistory-599514e5.js";import"./vue.esm-bundler-acd08dbe.js";import"./plugin-vueexport-helper-a0691a9b.js";const r=[{author:"John Doe",created:"06/04/2021 16:23",message:"Ut molestiae aliquam tenetur est veritatis dolorum tempora. Eaque similique et qui ea consequatur illum dignissimos. Ullam qui vel qui quo. Ea dolor quasi quibusdam quia illum sunt aspernatur. Eveniet odio quos ad."},{author:"Alice Smith",created:"03/04/2021 16:23",message:"Nulla natus dolores dolor. Voluptatem numquam doloribus architecto non praesentium. Sit facilis vitae sapiente. Placeat est qui et."},{author:"Bob Martin",created:"01/04/2021 08:23",message:"Corrupti reiciendis laboriosam repellat adipisci quis. Iure omnis cum nihil accusantium ut doloribus nisi. Ut itaque suscipit et nulla iste enim. Assumenda quis et ullam temporibus quidem rerum nostrum. Rerum debitis quae qui ea molestiae animi minus optio."},{author:"John Doe",created:"28/03/2021 10:00",message:"Sed et aut recusandae magni. Et aperiam dolores tempora. Eum et enim quia amet maxime quaerat earum. Quam fuga odit alias. Et repellendus accusantium corporis. Nihil et harum tenetur dolorum cum qui."}],t=i((e,{argTypes:n})=>({components:{TableHistory:o},props:Object.keys(n),template:'<TableHistory v-bind="$props" v-on="$props" />'}),"Template"),y=t.bind({}),a=t.bind({});a.args={entries:r};const u=t.bind({});u.args={entries:r,onHeadersRender:function(){return"<tr><th>Foo</th></tr>"},onItemRender:function(e){return`<tr><td>${e.message}</td></tr>`}};const m=t.bind({});m.args={entries:[],onHistoryEmptyRender:function(){return"<tr><td>No entry</td></tr>"}};const h={parameters:{storySource:{source:`/*
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

import TableHistory from './TableHistory.vue';
import type {Meta, StoryFn} from "@storybook/vue3";
import type {Entry} from "../interfaces";

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

const Template: StoryFn<typeof TableHistory> = (args, {argTypes}) => ({
  components: {TableHistory},
  props: Object.keys(argTypes),
  template: '<TableHistory v-bind="$props" v-on="$props" />',
});

export const NoHistory = Template.bind({});
export const WithHistory = Template.bind({});
WithHistory.args = {
  entries: mockEntries,
};
export const Dynamic = Template.bind({});
Dynamic.args = {
  entries: mockEntries,
  onHeadersRender: function () {
    return '<tr><th>Foo</th></tr>';
  },
  onItemRender: function (entry: Entry) {
    return \`<tr><td>\${entry.message}</td></tr>\`;
  },
};

export const DynamicEmpty = Template.bind({});
DynamicEmpty.args = {
  entries: [],
  onHistoryEmptyRender: function () {
    return '<tr><td>No entry</td></tr>';
  },
};

export default {
  title: 'TableHistory',
  component: TableHistory,
} as Meta;
`,locationsMap:{"no-history":{startLoc:{col:47,line:49},endLoc:{col:2,line:53},startBody:{col:47,line:49},endBody:{col:2,line:53}},"with-history":{startLoc:{col:47,line:49},endLoc:{col:2,line:53},startBody:{col:47,line:49},endBody:{col:2,line:53}},dynamic:{startLoc:{col:47,line:49},endLoc:{col:2,line:53},startBody:{col:47,line:49},endBody:{col:2,line:53}},"dynamic-empty":{startLoc:{col:47,line:49},endLoc:{col:2,line:53},startBody:{col:47,line:49},endBody:{col:2,line:53}}}}},title:"TableHistory",component:o},b=["NoHistory","WithHistory","Dynamic","DynamicEmpty"];export{u as Dynamic,m as DynamicEmpty,y as NoHistory,a as WithHistory,b as __namedExportsOrder,h as default};
//# sourceMappingURL=TableHistory.stories-233bd7b9.js.map
