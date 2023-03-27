var a=Object.defineProperty;var i=(e,r)=>a(e,"name",{value:r,configurable:!0});import{T as o}from"./TimelineHistory-206afa5a.js";import"./vue.esm-bundler-acd08dbe.js";import"./plugin-vueexport-helper-a0691a9b.js";const t=[{author:"John Doe",created:"06/04/2021 16:23",message:"Ut molestiae aliquam tenetur est veritatis dolorum tempora. Eaque similique et qui ea consequatur illum dignissimos. Ullam qui vel qui quo. Ea dolor quasi quibusdam quia illum sunt aspernatur. Eveniet odio quos ad."},{author:"Alice Smith",created:"03/04/2021 16:23",message:`Nulla natus dolores dolor. Voluptatem numquam doloribus architecto non praesentium.
Sit facilis vitae sapiente. Placeat est qui et.`},{author:"Bob Martin",created:"01/04/2021 08:23",message:`Corrupti <strong>reiciendis</strong> laboriosam repellat adipisci quis.

Iure omnis cum nihil accusantium ut doloribus nisi. Ut itaque suscipit et nulla iste enim. Assumenda quis et ullam temporibus quidem rerum nostrum. Rerum debitis quae qui ea molestiae animi minus optio.`},{author:"John Doe",created:"28/03/2021 10:00",message:"Sed et aut recusandae magni. Et aperiam dolores tempora. Eum et enim quia amet maxime quaerat earum. Quam fuga odit alias. Et repellendus accusantium corporis. Nihil et harum tenetur dolorum cum qui."}],n=i(e=>({components:{TimelineHistory:o},setup(){return{args:e}},template:'<TimelineHistory :entries="[]" v-bind="args" />'}),"Template"),g=n.bind({}),s=n.bind({});s.args={entries:t,horizontal:!0};const l=n.bind({});l.args={entries:t};const u=n.bind({});u.args={entries:t,onItemRender:function(e){return`<li><strong>${e.author}: </strong> ${e.message}</li>`}};const m=n.bind({});m.args={entries:t,horizontal:!0,onItemRender:function(e){return`<li><strong>${e.author}: </strong> ${e.message}</li>`}};const c=n.bind({});c.args={entries:[],horizontal:!0,onHistoryEmptyRender:function(){return"<p>No entry</p>"}};const q={parameters:{storySource:{source:`/*
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

import TimelineHistory from './TimelineHistory.vue';
import type {Meta, StoryFn} from "@storybook/vue3";
import type {Entry} from "../interfaces";

const mockEntries = [{
  author: 'John Doe',
  created: '06/04/2021 16:23',
  message: 'Ut molestiae aliquam tenetur est veritatis dolorum tempora. Eaque similique et qui ea consequatur illum dignissimos. Ullam qui vel qui quo. Ea dolor quasi quibusdam quia illum sunt aspernatur. Eveniet odio quos ad.',
}, {
  author: 'Alice Smith',
  created: '03/04/2021 16:23',
  message: 'Nulla natus dolores dolor. Voluptatem numquam doloribus architecto non praesentium.\\nSit facilis vitae sapiente. Placeat est qui et.',
}, {
  author: 'Bob Martin',
  created: '01/04/2021 08:23',
  message: 'Corrupti <strong>reiciendis</strong> laboriosam repellat adipisci quis.\\n\\nIure omnis cum nihil accusantium ut doloribus nisi. Ut itaque suscipit et nulla iste enim. Assumenda quis et ullam temporibus quidem rerum nostrum. Rerum debitis quae qui ea molestiae animi minus optio.',
}, {
  author: 'John Doe',
  created: '28/03/2021 10:00',
  message: 'Sed et aut recusandae magni. Et aperiam dolores tempora. Eum et enim quia amet maxime quaerat earum. Quam fuga odit alias. Et repellendus accusantium corporis. Nihil et harum tenetur dolorum cum qui.',
}];

const Template: StoryFn<typeof TimelineHistory> = (args) => ({
  components: {TimelineHistory},
  setup() {
    return {args};
  },
  template: '<TimelineHistory :entries="[]" v-bind="args" />',
});

export const NoHistory = Template.bind({});
export const Horizontal = Template.bind({});
Horizontal.args = {
  entries: mockEntries,
  horizontal: true,
};
export const Vertical = Template.bind({});
Vertical.args = {
  entries: mockEntries,
};
export const DynamicVertical = Template.bind({});
DynamicVertical.args = {
  entries: mockEntries,
  onItemRender: function (entry: Entry) {
    return \`<li><strong>\${entry.author}: </strong> \${entry.message}</li>\`;
  },
};

export const DynamicHorizontal = Template.bind({});
DynamicHorizontal.args = {
  entries: mockEntries,
  horizontal: true,
  onItemRender: function (entry: Entry) {
    return \`<li><strong>\${entry.author}: </strong> \${entry.message}</li>\`;
  },
};

export const DynamicEmptyHorizontal = Template.bind({});
DynamicEmptyHorizontal.args = {
  entries: [],
  horizontal: true,
  onHistoryEmptyRender: function () {
    return \`<p>No entry</p>\`;
  },
};

export default {
  title: 'TimelineHistory',
  component: TimelineHistory,
} as Meta;
`,locationsMap:{"no-history":{startLoc:{col:50,line:49},endLoc:{col:2,line:55},startBody:{col:50,line:49},endBody:{col:2,line:55}},horizontal:{startLoc:{col:50,line:49},endLoc:{col:2,line:55},startBody:{col:50,line:49},endBody:{col:2,line:55}},vertical:{startLoc:{col:50,line:49},endLoc:{col:2,line:55},startBody:{col:50,line:49},endBody:{col:2,line:55}},"dynamic-vertical":{startLoc:{col:50,line:49},endLoc:{col:2,line:55},startBody:{col:50,line:49},endBody:{col:2,line:55}},"dynamic-horizontal":{startLoc:{col:50,line:49},endLoc:{col:2,line:55},startBody:{col:50,line:49},endBody:{col:2,line:55}},"dynamic-empty-horizontal":{startLoc:{col:50,line:49},endLoc:{col:2,line:55},startBody:{col:50,line:49},endBody:{col:2,line:55}}}}},title:"TimelineHistory",component:o},b=["NoHistory","Horizontal","Vertical","DynamicVertical","DynamicHorizontal","DynamicEmptyHorizontal"];export{c as DynamicEmptyHorizontal,m as DynamicHorizontal,u as DynamicVertical,s as Horizontal,g as NoHistory,l as Vertical,b as __namedExportsOrder,q as default};
//# sourceMappingURL=TimelineHistory.stories-9a7cd7c4.js.map
