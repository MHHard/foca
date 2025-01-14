#

# name

模型的名称，通过`model.name`获取。

# state

模型的实时状态，通过`model.state`获取。你可以在任何地方使用，没有限制。但如果你想在组件里动态更新数据，就得配合 hooks 和 connect 了。

# loading

模型异步函数的当前状态，通过`getLoading(model.effectX)`获取。

# meta

模型异步函数的**当前**状态，通过`getMeta(model.effectX)`获取。

本质上，loading 派生自 meta，meta 总是存储了异步函数的一些执行信息，比如是否正在执行，比如执行异常时的 message。

```typescript
/**
 * {
 *   type?: 'pending' | 'resolved' | 'rejected';
 *   message?: string;
 * }
 */
const meta = getMeta(userModel.fetchUser);
```
