<script>
  import {
    LICENSE_URL,
    REPO_URL,
    VITE_VERCEL_GIT_COMMIT_REF,
    VITE_VERCEL_GIT_COMMIT_SHA,
  } from '$app/env/public';

  import Badges from './badges.svelte';
</script>

<footer class="space-y-3.5">
  <hr />
  <Badges />
  <div>
    <p>
      Source code <a href={REPO_URL} target="_blank" rel="noopener noreferrer">available here</a>,
      released under the
      <a href={LICENSE_URL} target="_blank" rel="noopener noreferrer">GNU AGPLv3 license</a>
    </p>
    <p>
      Ref: {VITE_VERCEL_GIT_COMMIT_REF} | Commit: {VITE_VERCEL_GIT_COMMIT_SHA}
    </p>
  </div>
</footer>
