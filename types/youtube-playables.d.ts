/**
 * YouTube Playables SDK v1 TypeScript Definitions
 * Official type definitions for integrating web games with YouTube Playables.
 */

declare namespace ytgame {
  /**
   * Whether the game is running within the YouTube Playables environment.
   */
  const IN_PLAYABLES_ENV: boolean;

  /**
   * The YouTube Playables SDK version string.
   */
  const SDK_VERSION: string;

  /**
   * Error types thrown by the YouTube Playables SDK.
   */
  enum SdkErrorType {
    API_UNAVAILABLE = "API_UNAVAILABLE",
    INVALID_PARAMS = "INVALID_PARAMS",
    SIZE_LIMIT_EXCEEDED = "SIZE_LIMIT_EXCEEDED",
    UNKNOWN = "UNKNOWN",
  }

  /**
   * Error class thrown by YouTube Playables SDK methods.
   */
  class SdkError extends Error {
    readonly errorType: SdkErrorType;
    constructor(errorType: SdkErrorType, message?: string);
  }

  /**
   * Functions and properties related to ads monetization.
   */
  namespace ads {
    /**
     * Requests an interstitial ad to be displayed.
     * Use during natural breakpoints (between levels, game over, restart).
     */
    function requestInterstitialAd(): Promise<void>;

    /**
     * Requests a rewarded ad to be displayed for a specific reward.
     * @param rewardId Unique identifier for the claimable reward type (no PII).
     * @returns Promise resolving to true if reward was earned, false otherwise.
     */
    function requestRewardedAd(rewardId: string): Promise<boolean>;
  }

  /**
   * Functions and properties related to player engagement and leaderboards.
   */
  namespace engagement {
    enum ContentType {
      PLAYABLE = "PLAYABLE",
      VIDEO = "VIDEO",
    }

    interface Content {
      id: string;
      contentType?: ContentType;
    }

    interface Score {
      value: number;
    }

    /**
     * Requests YouTube to open related content (video or another playable).
     */
    function openYTContent(content: Content): Promise<void>;

    /**
     * Sends a player's score to YouTube to display in platform UI / leaderboards.
     */
    function sendScore(score: Score): Promise<void>;
  }

  /**
   * Functions and properties related to game lifecycle and persistence.
   */
  namespace game {
    /**
     * Notifies YouTube that the game has rendered its first frame.
     * MUST be called before gameReady().
     */
    function firstFrameReady(): void;

    /**
     * Notifies YouTube that the game is interactable and loading is complete.
     */
    function gameReady(): void;

    /**
     * Loads cloud save data from YouTube as a UTF-16 serialized string.
     */
    function loadData(): Promise<string>;

    /**
     * Saves cloud save data to YouTube as a UTF-16 serialized string (max 3 MiB).
     */
    function saveData(data: string): Promise<void>;
  }

  /**
   * Functions and properties related to game health and monitoring.
   */
  namespace health {
    /**
     * Logs an error to YouTube telemetry.
     */
    function logError(): void;

    /**
     * Logs a warning to YouTube telemetry.
     */
    function logWarning(): void;
  }

  /**
   * Functions and properties related to the YouTube host system.
   */
  namespace system {
    /**
     * Returns the user's current YouTube language as a BCP-47 tag (e.g. "en-US").
     */
    function getLanguage(): Promise<string>;

    /**
     * Returns whether game audio is enabled in YouTube settings.
     */
    function isAudioEnabled(): boolean;

    /**
     * Sets a callback triggered when YouTube audio settings toggle.
     * @returns Unsubscribe function.
     */
    function onAudioEnabledChange(callback: (isAudioEnabled: boolean) => void): () => void;

    /**
     * Sets a callback triggered when YouTube pauses the game.
     * Game should pause its state and save data immediately.
     * @returns Unsubscribe function.
     */
    function onPause(callback: () => void): () => void;

    /**
     * Sets a callback triggered when YouTube resumes the game.
     * @returns Unsubscribe function.
     */
    function onResume(callback: () => void): () => void;
  }
}
